package com.itechart.trucking.converter;

import com.itechart.trucking.dto.AbstractDTO;
import com.itechart.trucking.entity.BaseEntity;
import org.springframework.core.convert.TypeDescriptor;
import org.springframework.core.convert.converter.GenericConverter;

import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.HashSet;
import java.util.Set;

@SuppressWarnings("unchecked")
public abstract class AbstractTwoWayConverter<D extends AbstractDTO, E extends BaseEntity> implements GenericConverter {

    private Class<D> classOfDTO;
    private Class<E> classOfEntity;

    protected AbstractTwoWayConverter() {
        Type typeA = ((ParameterizedType) this.getClass().getGenericSuperclass()).getActualTypeArguments()[0];
        Type typeB = ((ParameterizedType) this.getClass().getGenericSuperclass()).getActualTypeArguments()[1];
        this.classOfDTO = (Class) typeA;
        this.classOfEntity = (Class) typeB;
    }

    public Set<ConvertiblePair> getConvertibleTypes() {
        Set<ConvertiblePair> convertiblePairs = new HashSet<>();
        convertiblePairs.add(new ConvertiblePair(classOfDTO, classOfEntity));
        convertiblePairs.add(new ConvertiblePair(classOfEntity, classOfDTO));
        return convertiblePairs;
    }

    public Object convert(Object source, TypeDescriptor sourceType, TypeDescriptor targetType) {
        if (classOfDTO.equals(sourceType.getType())) {
            return this.convert((D) source);
        } else {
            return this.convertBack((E) source);
        }
    }

    protected abstract E convert(D dto);

    protected abstract D convertBack(E entity);

}